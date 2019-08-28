const admin = require('../admin')
const dayjs = require('dayjs')
const Card = require('./card')

module.exports = class Game {
  constructor(id) {
    this.id = id
    this.collection = admin.firestore().collection('games')
  }

  async get() {
    const doc = await this.collection.doc(this.id).get()
    return Object.assign(
      {
        id: doc.id,
      },
      doc.data()
    )
  }

  async create(uid) {
    const docRef = await this.collection.add({
      create_user_uid: uid,
      status: 'active',
      created_at: dayjs().toDate(),
      card_list: Card.createList(),
    })
    const doc = await docRef.get()
    return Object.assign(
      {
        id: doc.id,
      },
      doc.data()
    )
  }

  async revoke() {
    return this.collection.doc(this.id).update({
      status: 'revoked',
    })
  }

  async finish(incorrectCount) {
    await this.collection.doc(this.id).update({
      status: 'finish',
      end_at: dayjs().toDate(),
      incorrect: incorrectCount || 0,
    })
    return await this.get()
  }
}
