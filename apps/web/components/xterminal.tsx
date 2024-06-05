'use client';

import { useEffect, useRef, useState } from 'react';
import '@xterm/xterm/css/xterm.css';
import { term, ws } from '../utils';

export const XTerminal = () => {
  const termRef = useRef<HTMLDivElement | null>(null);
  const [commandBuffer, setCommandBuffer] = useState<string>('');
  const bufferRef = useRef<string>('');

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'data') {
        term.write(data.payload);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!termRef.current) return;

    term.open(termRef.current);

    term.writeln(
      'Hi there! This is \x1B[1;3;31mTerwmser\x1B[0m, your browser terminal'
    );

    const handleKey = ({
      key,
      domEvent,
    }: {
      key: string;
      domEvent: KeyboardEvent;
    }) => {
      if (domEvent.key === 'Enter') {
        const commandToSend = bufferRef.current;
        ws.send(JSON.stringify({ type: 'command', payload: commandToSend }));
        bufferRef.current = '';
        setCommandBuffer('');
        term.write('\r\n');
      } else if (domEvent.key === 'Backspace') {
        bufferRef.current = bufferRef.current.slice(0, -1);
        term.write('\b \b');
      } else {
        bufferRef.current += key;
        term.write(key);
      }
    };

    term.onKey(handleKey);

    return () => {
      term.clear();
      term.dispose();
    };
  }, [termRef]);

  return <div ref={termRef} style={{ height: '100%', width: '100%' }}></div>;
};
