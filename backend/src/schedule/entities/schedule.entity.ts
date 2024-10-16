import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'schedule',
    timestamps : true,
    paranoid : true,
})
export class Schedule extends Model<Schedule> {

    // index
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    id!:number;

    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    uid!:string;

    // 스케줄 내용
    @Column({
        type: DataType.TEXT,
        allowNull : false,
    })
    content!:string;

    // 날짜배열
    @Column({
        type : DataType.JSON,
        allowNull: true
    })
    dateArr:string[];
    
    // 난이도
    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    difficulty! : string;

    // 완료 여부
    @Column({
        type: DataType.BOOLEAN,
    })
    isFinished:boolean;


}
