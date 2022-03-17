import {getRepository} from "typeorm";
import {Proposal} from "../entity/Proposal";
import {NextFunction, Request, Response} from "express";

export class ProposalController {

    private proposalRepository = getRepository(Proposal);

    async all(request: Request, response: Response, next: NextFunction) {

         let proposals = await this.proposalRepository.find();

         if(!proposals) {
            return response.status(400).json("There are no proposals");
         }

         return response.status(200).json(proposals);

    }

    async one(request: Request, response: Response, next: NextFunction) {

         let proposal = await this.proposalRepository.findOne(request.params.id);

         if(!proposal) {
            return response.status(400).json("Proposal does not exists");
         }

         return response.status(200).json(proposal);

    }

    async save(request: Request, response: Response, next: NextFunction) 
    {
        await this.proposalRepository.save(request.body);

        return response.status(201).json("Proposal successfully created");

    }

    async update(request: Request, response: Response, next: NextFunction) {
        
        let { newContractorCpf, newContractorName, newContractorEmail, newProduct, newBeneficiaries, newProposalJson, } = request.body;
        
        let proposalToUpdate = await this.proposalRepository.findOne(request.params.id);
        
        if(!proposalToUpdate) {
            return response.status(400).json("Proposal does not exists");
        }
 
        this.proposalRepository.createQueryBuilder().update().set({ contractorCpf: newContractorCpf, contractorName: newContractorName, contractorEmail: newContractorEmail, product: newProduct, beneficiaries: newBeneficiaries, proposalJson: newProposalJson, }).where("proposalId = :id", { id: request.params.id }).execute();

        return response.status(200).json("Proposal successfully updated");

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let proposalToRemove = await this.proposalRepository.findOne(request.params.id);

        if(!proposalToRemove) {
            return response.status(400).json("Proposal does not exists");
        }

        await this.proposalRepository.remove(proposalToRemove);
    
        return response.status(200).json("Proposal successfully deleted");

    }

}