import {ProposalController} from "./controller/ProposalController";

export const Routes = [
    
    {
        method: "get",
        route: "/proposal",
        controller: ProposalController,
        action: "all"
    }, 
    
    {
        method: "get",
        route: "/proposal/:id",
        controller: ProposalController,
        action: "one"
    }, 
    
    {
        method: "post",
        route: "/proposal",
        controller: ProposalController,
        action: "save"
    },
    
    {
        method: "put",
        route: "/proposal/:id",
        controller: ProposalController,
        action: "update"
    },

    {
        method: "delete",
        route: "/proposal/:id",
        controller: ProposalController,
        action: "remove"
    }

];