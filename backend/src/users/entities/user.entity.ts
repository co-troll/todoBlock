import { AutoIncrement, Column, DataType, Index, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName : 'users',
    timestamps: true,
    paranoid : true,
})
export class User extends Model<User> {

    // id (index)
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    id!:number;

    // 유저 아이디
    @Index({unique : true})
    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    uid!:string;

    // 유저 비밀번호
    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    upw!:string;

    // 전화번호
    @Index({unique : true})
    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    phoneNumber!:string;
}
