import { MatButtonModule,MatCheckboxModule } from '@angular/material'
import {MatMenuModule,} from '@angular/material/menu';
import {MatIconModule,} from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule],
})

export class MaterialModule{}