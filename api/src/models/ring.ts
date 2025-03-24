import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

interface RingAttributes {
  id: string;
  name: string;
  power: string;
  imageUri: string;
  bearer: string;
  forger: string;
  bearerId: string;
}

interface RingCreationAttributes extends Optional<RingAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Rings',
})
export class Ring extends Model<RingAttributes, RingCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  power!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUri!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bearer!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  forger!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  bearerId!: string;

  @BelongsTo(() => User, { as: 'bearedUser', foreignKey: 'bearerId' })
  bearedUser!: User;
}
