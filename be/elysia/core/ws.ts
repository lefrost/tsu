import { Elysia, t } from 'elysia';

export const ws = new Elysia().ws(
  `/ws`, {
    body: t.Union([
      t.Object({
        x: t.Literal(`dm`),
        d: t.Object({ msg: t.String(), userk: t.String() })
      }),
      t.Object({
        x: t.Literal(`global`),
        d: t.Object({ msg: t.String() })
      }),
      t.Object({
        x: t.Literal(`room`),
        d: t.Object({ roomk: t.String(), msg: t.String() })
      }),
      t.Object({
        x: t.Literal(`roomJoin`),
        d: t.Object({ roomk: t.String() })
      }),
      t.Object({
        x: t.Literal(`roomLeave`),
        d: t.Object({ roomk: t.String() })
      }),
    ]),

    message(ws, { d, x }) {
      switch (x) {
        case `dm`: {
          ws.publish(d.userk, JSON.stringify({ userk: ws.id, msg: d.msg }));
          break;
        }
        case `global`: {
          ws.publish(`global`, JSON.stringify({ userk: ws.id, msg: d.msg }));
          ws.send(JSON.stringify({ userk: ws.id, msg: d.msg }));
          break;
        }
        case `room`: {
          ws.publish(d.roomk, JSON.stringify({ userk: ws.id, msg: d.msg }));
          ws.send(JSON.stringify({ userk: ws.id, msg: d.msg }));
          break;
        }
        case `roomJoin`: {
          ws.subscribe(d.roomk);
          break;
        }
        case `roomLeave`: {
          ws.unsubscribe(d.roomk);
          break;
        }
      }
    },

    open(ws) {
      ws.subscribe(`global`);
      ws.subscribe(ws.id);
    },
  }
);