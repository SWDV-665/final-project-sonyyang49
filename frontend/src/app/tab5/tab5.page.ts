import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss']
})
export class Tab5Page implements OnInit {
  user = '';

  animal = [
    { question: 'tus nyuj', answer: 'cow' },
    { question: 'tus kheb', answer: 'crocodile' },
    { question: 'tus aub', answer: 'dog' },
    { question: 'tus os', answer: 'duck' },
    { question: 'tus ntxhw', answer: 'elephant' },
    { question: 'tus qav', answer: 'frog' },
    { question: 'tus nees caj dab ntev', answer: 'girraffe' },
    { question: 'tus tshis', answer: 'goat' },
    { question: 'tus ntxhw dej', answer: 'hippo' },
    { question: 'tus dais ntoo', answer: 'koala' },
    { question: 'tus tsov ntxhuav', answer: 'lion' },
    { question: 'tus liab', answer: 'monkey' },
    { question: 'tus nas', answer: 'mouse' },
    { question: 'tus lias txaij', answer: 'lemur' },
    { question: 'tus dais qhov muag dub', answer: 'panda' },
    { question: 'tus npua', answer: 'pig' },
    { question: 'tus dais dawb', answer: 'polar_bear' },
    { question: 'tus dej paum', answer: 'porcupine' },
    { question: 'tus luav', answer: 'rabbit' },
    { question: 'tus mab', answer: 'racoon' },
    { question: 'tus yaj', answer: 'sheep' }
  ];

  randomAnimal = [];

  correctAnswer = '';
  question = '';

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    this.getRandomAnimals();
    this.getRandomQuestion();
  }

  getRandomAnimals() {
    while (this.randomAnimal.length < 9) {
      let rand_animal = Math.floor(Math.random() * this.animal.length);
      this.randomAnimal.push(this.animal[rand_animal]);
      this.animal.splice(rand_animal, 1);
    }
  }

  picToView(animal) {
    return '/assets/images/' + animal.answer + '.png';
  }

  getRandomQuestion() {
    let question_index = Math.floor(Math.random() * this.randomAnimal.length);
    this.correctAnswer = this.randomAnimal[question_index].answer;
    this.question = this.randomAnimal[question_index].question;
  }

  checkAnswer(answer) {
    if (answer.answer !== this.correctAnswer) {
      this.presentIncorrectAlert();
      console.log(answer.answer);
    } else {
      this.presentCorrectAlert();
    }
  }

  async presentCorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Correct! Zoo Heev!',
      subHeader: 'You answered correctly. ',
      message: 'Click Ok to go to the next question. ',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'primary',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentIncorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Wrong! Tsis yog lawm!',
      subHeader: 'You chose the wrong answer. ',
      message: 'Click Ok and try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
