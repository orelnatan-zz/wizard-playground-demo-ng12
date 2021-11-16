import { Component, Input } from '@angular/core';

@Component({
  selector: 'github-link',
  templateUrl: './github-link.component.html',
  styleUrls: ['./github-link.component.scss']
})
export class GithubLink {
    @Input() urlSuffix: string;


}
