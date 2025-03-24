import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Ring } from './ring';

type BreedProps = 'elf' | 'dwarf' | 'man' | 'sauron';
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  breed: BreedProps;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
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
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed!: 'elf' | 'dwarf' | 'man' | 'sauron';

  @HasMany(() => Ring)
  rings!: Ring;
}
