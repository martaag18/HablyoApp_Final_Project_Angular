import {
    trigger,
    transition,
    style,
    animate,
    query,
    group
  } from '@angular/animations';
  

  export const routeTransitionAnimations = trigger('fadeAnimation', [
    transition('* <=> *', [
      query(
        ':enter, :leave',
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0
        }),
        { optional: true }
      ),
      query(':leave', style({ opacity: 1 }), { optional: true }),
  
      group([
        query(
          ':leave',
          animate(
            '500ms ease',
            style({
              opacity: 0
            })
          ),
          { optional: true }
        ),
        query(
          ':enter',
          animate(
            '500ms ease',
            style({
              opacity: 1
            })
          ),
          { optional: true }
        )
      ])
    ])
  ]);
  