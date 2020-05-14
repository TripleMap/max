import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeFadeInOut } from '../fade';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    public ngOnInit(): void {
        new HomeFadeInOut().show('max', 0, 0.8, 3.6);
        new HomeFadeInOut().show('profession', 0, 1.2, 3.6);
    }
}
