import { Component, OnInit } from '@angular/core';
import { StorageLocalService } from './shared/local-storage/storagelocal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StorageLocalService]
})
export class AppComponent implements OnInit {
  constructor(private _storageLocalService: StorageLocalService) {}
  ngOnInit() {
    this._storageLocalService.startDatabaseWithDummyData();
  }
}
