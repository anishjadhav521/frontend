import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { GlobalErrorService } from './services/global-error.service';
import { interceptor } from './services/interceptor.interceptor';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastModule,
    DrawerModule,
    NgxChartsModule
],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
            options:{
              darkModeSelector:false||'none'
            }
        }
    }),
    MessageService,
    // {provide:ErrorHandler,useClass:GlobalErrorService},
    {provide:HTTP_INTERCEPTORS,useClass:interceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
