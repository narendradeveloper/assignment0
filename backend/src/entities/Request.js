const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Request',
  tableName: 'requests',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
     type: {
      type: 'enum',
      enum: ['read', 'write'],
    },
      status: {
      type: 'enum',
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
      createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    software: {
      type: 'many-to-one',
      target: 'Software',
      joinColumn: true,
       onDelete: 'CASCADE',
    },
  },
});
