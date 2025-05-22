const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Software',
  tableName: 'software',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    }, 
  },
   relations: {
    requests: {
      target: 'Request',
      type: 'one-to-many',
      inverseSide: 'software',
    },
  },
});
