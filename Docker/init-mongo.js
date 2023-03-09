db.createUser({
  user: 'seom',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'signtoalldb'
    }
  ]
})
