import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})

//Creates the game upon login.  
export class InsidePage implements OnInit {
  //Stores the variations of questions and answers.  
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

  data = '';

  constructor(private nativeAudio: NativeAudio, private authService: AuthService, private storage: Storage, private toastController: ToastController, private alertCTRL: AlertController) { }

  ngOnInit() {
    this.getRandomAnimals();
    this.getRandomQuestion();
  }

  //Randomize the animals in an array of length 9. 
  getRandomAnimals() {
    while (this.randomAnimal.length < 9) {
      let rand_animal = Math.floor(Math.random() * this.animal.length);
      this.randomAnimal.push(this.animal[rand_animal]);
      this.animal.splice(rand_animal, 1);
    }
  }

  //Shows the picture of the animal.
  picToView(animal) {
    return '../assets/images/' + animal.answer + '.png';
  }

  //Calls a random index in the random animal array.  
  getRandomQuestion() {
    let question_index = Math.floor(Math.random() * this.randomAnimal.length);
    this.correctAnswer = this.randomAnimal[question_index].answer;
    this.question = this.randomAnimal[question_index].question;
  }

  //Checks to see if answer is correct. 
  checkAnswer(answer) {
    if (answer.answer !== this.correctAnswer) {
      this.presentIncorrectAlert();
      console.log(answer.answer);
    } else {
      this.presentCorrectAlert();
    }
  }

  //Alerts a correct answer. 
  async presentCorrectAlert() {
    const alert = await this.alertCTRL.create({
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

  //Alerts a wrong answer.  
  async presentIncorrectAlert() {
    const alert = await this.alertCTRL.create({
      header: 'Wrong! Tsis yog lawm!',
      subHeader: 'You chose the wrong answer. ',
      message: 'Click Ok and try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

  //Plays the audio question. 
  playQuestion() {
    console.log(this.correctAnswer);
    this.nativeAudio.preloadSimple(this.correctAnswer, '../assets/audio/' + this.correctAnswer + '.mp3');
    this.nativeAudio.play(this.correctAnswer);
  }

  //Plays when the answer is incorrect. 
  incorrectAudio() {
    this.nativeAudio.preloadSimple('incorrect', '../assets/audio/incorrect.mp3');
    this.nativeAudio.play('incorrect');

  }

  //Plays when an answer is correct. 
  correctAudio() {
    this.nativeAudio.preloadSimple('correct', '../assets/audio/correct.mp3');
    this.nativeAudio.play('correct');
  }

  //Music that plays in the background. 
  playMusic() {
    this.nativeAudio.preloadSimple('music', '../assets/audio/henesy_music.mp3');
    this.nativeAudio.play('music');
  }

  //Logout of the game. 
  logout() {
    this.authService.logout();
  }



}