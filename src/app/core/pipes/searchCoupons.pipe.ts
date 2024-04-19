import { Pipe, PipeTransform } from '@angular/core';
import { Coupon } from '../interfaces/coupon';

@Pipe({
  name: 'searchCoupons',
  standalone: true
})
export class SearchCouponsPipe implements PipeTransform {

  transform(list: Coupon[], text: string): Coupon[] {
    return list.filter((item)=>item.discountCode.toLowerCase().includes(text.toLowerCase()));
  }

}
