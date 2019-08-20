import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private alertCTRL: AlertController) {}

  async promptGame() {
    const alert = await this.alertCTRL.create({
      header: 'Game Instructions:',
      message:
        '1. Read the question and/or play audio of the question. <br/><br/> 2. Click the animal that the question asks you to find. <br/><br/> 3. Earn as many points as you can.  <br/><br/> Once you are ready to start the game, click the start button.',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Start',
          handler: () => {
            window.location.replace('http://localhost:8100/tabs/tab5');
          }
        }
      ]
    });

    await alert.present();
  }
}
