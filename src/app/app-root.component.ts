import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRoot implements OnInit {
    data = {
        countries: []
    }

    ngOnInit(): void {
        // Object.keys(DB).forEach((country: string, index: number) => {
        //     this.data.countries.push({
        //         id: index + 1,
        //         name: country,
        //         color: null,
        //         icon: null,
        //         disabled: false
        //     })
        // });

        // console.log(JSON.stringify(this.data))
    }


}
