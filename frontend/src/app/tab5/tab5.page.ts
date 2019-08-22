import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

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

  constructor(public alertController: AlertController, public nativeAudio: NativeAudio) {}

  ngOnInit() {
    this.getRandomAnimals();
    this.getRandomQuestion();
    this.playMusic();
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
    this.questionAudio(this.correctAnswer);
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

  questionAudio(animal) {
    this.nativeAudio.preloadSimple(animal, '../../assets/audio/'+ animal + '.m4a').then(
      function (msg) {
        console.log(msg);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  incorrectAudio(){
    this.nativeAudio.preloadSimple('incorrect', '../../assets/audio/incorrect.m4a').then(
      function (msg) {
        console.log(msg);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  correctAudio(){
    this.nativeAudio.preloadSimple('correct', '../../assets/audio/correct.m4a').then(
      function (msg) {
        console.log(msg);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  playMusic(){
    this.nativeAudio.preloadSimple('music', '../../assets/audio/henesy_music.mp3').then(
      function (msg) {
        console.log(msg);
      },
      function (error) {
        console.log(error);
      }
    );
  }
}
