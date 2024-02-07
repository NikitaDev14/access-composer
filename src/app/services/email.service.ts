import { Injectable } from '@angular/core';
import {PublishCommand, PublishCommandOutput, SNSClient} from "@aws-sdk/client-sns";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private snsClient: SNSClient;
  private readonly topic = 'arn:aws:sns:us-east-1:535566642931:New_user';

  constructor() {
    this.snsClient = new SNSClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAXZMSCN3Z6V6AMMHN',
        secretAccessKey: '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',
      },
    });
  }

  public send(newUserEmail: string): Promise<PublishCommandOutput> {
    return this.snsClient.send(
      new PublishCommand({
        TopicArn: this.topic,
        Message: `A new user is interested in my startup! ${newUserEmail}`,
        Subject: 'Access Composer'
      }),
    );
  }
}
