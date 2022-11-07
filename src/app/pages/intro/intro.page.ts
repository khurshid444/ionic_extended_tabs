import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { UserDetailService } from '../../services/user-detail.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(public userdetailservice: UserDetailService,
    private router: Router) {}

  ngOnInit() {}

  next() {
    this.slides.slideNext();
  }

  async start() {
    await this.userdetailservice.setItem(INTRO_KEY,'true');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
