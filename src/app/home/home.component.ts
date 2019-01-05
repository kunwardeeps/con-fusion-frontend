import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      disherrmess => this.dishErrMess = <any>disherrmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      promoerrmess => this.promoErrMsg = <any>promoerrmess);
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      leadererrmess => this.leaderErrMsg = <any>leadererrmess);
  }

}
