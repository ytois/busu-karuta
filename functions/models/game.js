const admin = require('../admin')
const dayjs = require('dayjs')
const Card = require('./card')

module.exports = class Game {
  constructor(id) {
    this.id = id
    this.collection = admin.firestore().collection('games')
  }

  async get() {
    return await this.collection.doc(this.id)
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

  revoke() {
    return this.collection.doc(this.id).update({
      status: 'revoked',
    })
  }
}
