import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Auth',
  timestamps : true,
  paranoid : false,
})
export class SMSVerification extends Model<SMSVerification> {
  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @Column({ type: DataType.STRING })
  verificationCode: string;

  @Column({ type: DataType.DATE })
  expiresAt: Date;
}