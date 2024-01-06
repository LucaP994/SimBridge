import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCDUPage } from './mcdu.page';

describe('MCDUPage', () => {
  let component: MCDUPage;
  let fixture: ComponentFixture<MCDUPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MCDUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
