
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { tagId: 'TAG1', pin: '1234', name: 'Test1' },
        { tagId: 'TAG2', pin: '1234', name: 'Test2' },
      ]);
    });
};
