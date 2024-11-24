import { Request, Response } from 'express';

import  Email from '../models/email2';

async function send(req: Request, res: Response) : Promise<void>{
    console.log("in");
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const email = new Email({
        to: req.body.to,
        subject: req.body.subject,
        template: req.body.template,
        context: req.body.context,
        attachments: req.body.attachments
    });

    Email.send(email, (result) => {
        if (!result) {
            res.status(500).json({ message: "An error occured while sending the email!" });
        } else {
            res.status(200).json({ message: "Email was sent." });
        }
    });
}

export {
    send
};