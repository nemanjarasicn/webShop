import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    $('.loader-wrapper')?.fadeOut('slow', function() {
       $(this).remove();
    })

    $(".bg-img" ).parent().addClass('bg-size');

    jQuery('.bg-img').each(function() {

      let el = $(this),
        src = el.attr('src'),
        parent = el.parent();

      parent.css({
        'background-image': 'url(' + src + ')',
        'background-size': 'cover',
        'background-position': 'center',
        'display' : 'block'
      });

      el.hide()
    })
  }
}
