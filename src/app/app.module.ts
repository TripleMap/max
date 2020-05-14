import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { GaleryComponent } from './galery/galery.component';
import { AboutComponent } from './about/about.component';
import { PricesComponent } from './prices/prices.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GaleryRollerDirective } from './galery/galery-roller.directive';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MobileGaleryComponent } from './mobile-galery/mobile-galery.component';
import * as Hammer from 'hammerjs';
import { ScrollBodyDirective } from './scroll-body.directive';

const routes: Routes = [];
const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 108],
};

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        swipe: { direction: Hammer.DIRECTION_ALL },
        pinch: { direction: Hammer.DIRECTION_ALL },
        pan: { direction: Hammer.DIRECTION_ALL },
    };
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BodyComponent,
        HomeComponent,
        GaleryComponent,
        AboutComponent,
        PricesComponent,
        ContactsComponent,
        GaleryRollerDirective,
        ImageViewerComponent,
        MobileMenuComponent,
        MobileGaleryComponent,
        ScrollBodyDirective,
    ],
    imports: [BrowserModule, RouterModule.forRoot(routes, routerOptions), DeviceDetectorModule.forRoot(), HammerModule],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig,
        },
    ],
})
export class AppModule {}
