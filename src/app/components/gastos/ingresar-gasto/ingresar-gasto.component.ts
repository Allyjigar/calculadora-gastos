import { PresupuestoService } from './../../../services/presupuesto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string = '';
  cantidad: number = 0;
  formularioIncorrecto: boolean = false;
  textoIncorrecto: string = '';

  constructor(private _presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
  }

  agregarGasto(){

    if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada mayor al restante';
      return;
    }
    if(this.nombreGasto == '' || this.cantidad <=0){
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre de gasto o cantidad incorrecta';
    } else {
      // Creamos un objeto

      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      //Enviamos el objeto a los subscriptores
      this._presupuestoService.agregarGasto(GASTO);

      //resetamos form
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }

}
