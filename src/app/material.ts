import { MatButtonModule,MatCheckboxModule } from '@angular/material'
import {MatMenuModule,} from '@angular/material/menu';
import {MatIconModule,} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatSidenavModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatSidenavModule],
})

export class MaterialModule{}