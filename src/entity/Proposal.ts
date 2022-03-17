import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Proposal {

    @PrimaryGeneratedColumn()
    proposalId: number;

    @Column()
    contractorCpf: number;
    
    @Column()
    contractorName: string;

    @Column()
    contractorEmail: string;

    @Column()
    product: string;
    
    @Column()
    beneficiaries: number;

    @CreateDateColumn()
    createDate: Date;

    @CreateDateColumn()
    sigDatea: Date;

    @CreateDateColumn()
    updateDate: Date;

    @Column("simple-json")
    proposalJson: {}

}
