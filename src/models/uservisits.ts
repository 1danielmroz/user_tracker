
//importing type definitions for typerom
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('users_visits') //naming the table

export class Users_Visits{

  @PrimaryGeneratedColumn()
    id_sesion: number;

    //browser
    @Column()
    browser: string;
    //domain
    @Column()
    domain: string;
    //Height
    @Column({
      length:100
    })
    height: string;
    //width
    @Column({
      length:100
    })
    width: string;
    //user ip
    @Column({
      length:100
    })
    userIP: string;
    //mobile
    @Column()
    is_mobile: boolean;

    //user log into website
    @Column({
      length:100
    })
    log_time: string;
    
    @Column({
      length:100
    })
    log_time_raw: string;

    //user leves website
    @Column({
      length:100
    })
    leave_time: string;

    @Column({
      length:100
    })
    leave_time_raw: string;
}
