import { XTerminal } from '../components/xterminal';

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold font-mono pt-20">Terwmser</h1>
      <div className="w-[950px] pt-1 pl-3 bg-black h-[420px] my-10 border-solid border-4 outline-none rounded-3xl overflow-hidden border-white">
        <XTerminal />
      </div>
    </div>
  );
}
