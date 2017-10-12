import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store'
import { UPDATE_OPTION } from '../../reducers/options.reducer'

@Component({
  selector: 'app-magick-input',
  templateUrl: './magick-input.component.html',
  styleUrls: ['./magick-input.component.css']
})
export class MagickInputComponent implements OnInit {
  options: any;
  @Input() opts: any;
  constructor(
    private store: Store<any>
  ) { }
  ngOnInit() {

  }
  ngOnChanges(changes) {
    console.log("Change", changes)
    if (changes.opts.currentValue) {
      this.options = changes.opts.currentValue;
    }
  }
  onChange(e) {
    if (this.options.type == 'checkbox') {
      this.options.value = e.checked
    } else { this.options.value = e.value; }

    console.log("E", e)
    this.store.dispatch({ type: UPDATE_OPTION, payload: { id: this.options.id, value: this.options } })
  }
}

type Bias = number
type In = Binary
type Weight = number
enum Binary {
  True = 1,
  False = 0
}
type WeightedInput = [Weight, In]

function length(a: Array<any>) {
  return a.length
}
function zip(as, bs) {
  if (length(as) !== length(bs)) return null;
  return as.map((a, i) => ([a, bs[i]]))
}

class Perceptron {

  bias: Bias;
  weights: Array<Weight>;
  weightedInputs: Array<WeightedInput>;

  constructor(bias: Bias, weights: Array<Weight>) {
    this.bias = bias;
    this.weights = weights;
  }
  setWeightsFromInputs(ins: Array<In>) {
    if (zip(ins, this.weights)) {
      this.weightedInputs = zip(this.weights, ins)
    }
  }
  shouldFire() {
  }
  fire() { }
}
let p = new Perceptron(5, [1, 2, 3]);
p.setWeightsFromInputs([3, 2, 1])
