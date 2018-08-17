import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatStepperModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatOptionModule, MatSelectModule, MatRadioModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { HomeComponent } from './home/home.component';
import { GlobalVariablesService } from './shared/global/global-variables-service';
import { StatisticsComponent } from './statistics/statistics.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'survey-form', component: SurveyFormComponent},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    HomeComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MatStepperModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatToolbarModule, MatOptionModule, MatSelectModule, MatRadioModule,
    RouterModule.forRoot(appRoutes),CustomFormsModule, 
    LocalStorageModule.withConfig({
      prefix: 'bmw-survey',
      storageType: 'localStorage'
    })
  ],
  providers: [GlobalVariablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
