import { ElementRef, Renderer2 } from '@angular/core';

export class DOMManipulation {

  constructor(
    private el: ElementRef,
    private dom: Renderer2
  ) { }

  removeClassToElement(elementId: string, className: string): void {
    const el = this.el.nativeElement.querySelector(`#${elementId}`)
    this.dom.removeClass(el, className);
  }

  addClassToElement(elementId: string, className: string): void {
    const el = this.el.nativeElement.querySelector(`#${elementId}`);
    this.dom.addClass(el,className);
  }

  elementContais(elementId: string, className: string): boolean {
    const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
    const contais = el.classList.contains(className);
    return contais
  }

}
