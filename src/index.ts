import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {Proposal} from "./entity/Proposal";
import * as cors from 'cors';

createConnection().then(async connection => {

    // create express app
    const app = express();

    app.use(bodyParser.json());

    const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

    const options: cors.CorsOptions = {
        //methods: 'GET,OPTIONS,PUT,POST,DELETE',
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
          ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        origin: allowedOrigins,
    };

    app.use(cors(options));

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            
            const result = (new (route.controller as any))[route.action](req, res, next);
            return res;
            
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    await connection.manager.save(connection.manager.create(Proposal, {
        contractorCpf: 19652345248,
        contractorName: "Contratante",
        contractorEmail: "contratante@contratante.com",
        product: "produto",
        beneficiaries: 2,
        proposalJson: '{"payloadversion":2,"hostname":"benevix.planium.io","appversion":"1.0.0","version_core":"4.0.0","version_custom":"16.0.0","browserinfo":{"useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36"},"browser_timestamp":1644433793788,"data_tblpreco":"2022-01-31","demomode":true,"data_custom":{"empresarialData":{"cnpjOperadora":"?????"}},"productrequiredecsau":true,"missingdecsauanswers":1,"data_assinatura":"2022-02-09","data_browser":"2022-02-09T19:09:53.788Z","tblpreco_ref_date_type":1,"data_ref_for_age":"2022-02-09","venda_direta":false,"corretagem":{"vendedor":{"identificador":"9090","cpf":"71563575221","nome":"VENDEDOR DIIS","email":"suporte@bitix.com.br","telefone":null},"corretora":{"identificador":"08005910534","cnpj":"08263978000158","nome":"SOLLO BRASIL","email":"atendimentosollobenevix@sollobrasil.com.br","generico1":"2"}},"login":{"usuario":"vendedor0","email":"suporte@bitix.com.br","nome":"VENDEDOR DIIS","cpf":"71563575221"},"contrato":{"uuid":"f6338751-29a6-4d04-8bba-3bea299306b0","produtos":["saude"],"coparticipacao":true,"numvidas":2,"segmentacao":"S","segmentacao_filter":["A","AHCO"],"total_beneficiarios":1,"total_valor":166.51,"total_valor_plano":166.51,"tipo_contratacao":"pj","data_vigencia":null,"forma_pagamento":{"tipo":"?"}},"simulacao_result":{"operadora":"PLANO DE SAUDE","beneficiarios":0,"valor":0},"empresa":{"razaosocial":"BITIX TESTE SA","nomefantasia":"","cnpj":"74467811000133","inscricaoestadual":"8486486498","cnae":"1234567","mei":false,"dropdown0":"1","dropdown2":"2","responsavel":{"uuid":"371bbc32-85ad-4ca4-81e7-7e08d3bdc2a2","nome":"JULIA SILVA","tipomask":0,"cpf":"77375244103","titular_uuid":"","email":"bruno.vasconcellos@planium.com.br","emailconfirm":"bruno.vasconcellos@planium.com.br","tel_celular":"21941223344","endereco2_igual_endereco1":true,"tipomaskbits":"1 contratante - 2 respfin - 4 replegal - 8 titular - 16 dependente "},"contato_igual_responsavel":true,"endereco2_igual_endereco1":false,"endereco1":{"cep":"22793080","logradouro":"AVENIDA DAS AMERICAS","numero":"10","bairro":"BARRA DA TIJUCA","cidade":"RIO DE JANEIRO","uf":"RJ","codigo_ibge":-1,"flag":false}},"beneficiarios":[[{"uuid":"e425d53a-353b-4458-8f8d-ff32f2bf0eb9","nome":"JULIA SILVA","tipomask":8,"cpf":"77375244103","titular_uuid":"","plano_id":"4642608461","plano_extra":null,"record_plano":{"cnpjoperadora":"27578434000120","registroans":476707161,"codigoproduto":"4642608.1","produto":"1163 - Participativo Estadual Empresarial Enfermaria SOS  (LIVRE ADESAO)?","tipocontratacao":"pj","btxplano":4642608461,"abrangencia":"E","segmentacao":"AHCO","acomodacao":"C","coparticipacao":true,"decsau_required":true,"contrato":null,"detalhesurl":null,"label":"1163 - Participativo Estadual Empresarial Enfermaria SOS  (LIVRE ADESAO)?  (col)","$$hashKey":"object:2330"},"record_preco":[{"minvidas":1,"btxplano":4642608461,"preco":[148.67,166.51,191.46,210.63,248.53,285.77,371.53,482.98,647.14,886.64]}],"email":"bruno.vasconcellos@planium.com.br","emailconfirm":"bruno.vasconcellos@planium.com.br","data_nascimento":"2001-10-10","produtos":{"saude":{"btxplan":4642608461,"data_tblpreco":"2022-01-31","cnpjoperadora":"27578434000120","nome":"1163 - Participativo Estadual Empresarial Enfermaria SOS  (LIVRE ADESAO)?","reg_ans":476707161,"acomodacao":"C","coparticipacao":true,"segmentacao":"AHCO","abrangencia":"E","valor":166.51}},"sexo":"M","estado_civil":1,"nome_mae":"FLAMENGO MENGO","nome_pai":"FLAMENGO MENGO","cns":"791269816980009","naturalidade":"FLAMENGO MENGO","rg_numero":"9948949844","tel_fixo":"9999999999","tel_celular":"21941223344","tel_comercial":"9999999999","curinga1":"02/02/2020","dropdown6":"2","reducaodecarencia_skipdecsau_flag":false,"endereco1":{"cep":"29047660","logradouro":"RUA MARINS ALVARINO","numero":"10","bairro":"ITARARE","cidade":"VITORIA","uf":"ES","codigo_ibge":3205309,"flag":true},"endereco2":{"cep":"29047660","logradouro":"RUA MARINS ALVARINO","numero":"10","bairro":"ITARARE","cidade":"VITORIA","uf":"ES","codigo_ibge":3205309,"flag":false},"endereco2_igual_endereco1":true,"decsau":{"orientacaomedica":{"optionid":"","ds_skip_flag":false,"crm_flag":false,"crm":"","nome":"","uf":""}}}]]}'
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/proposal to see results");

}).catch(error => console.log(error));
