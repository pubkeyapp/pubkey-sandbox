import { ProgramCounterList } from './counter/program-counter-list';
import { ProgramEpplexFeature } from './epplex/program-epplex-feature';
import { ProgramMeta } from './use-programs';

export function ProgramRenderFeature({ program }: { program: ProgramMeta }) {
  switch (program.app) {
    case 'counter':
      return <ProgramCounterList />;
    case 'ephemerality':
      return <ProgramEpplexFeature programMeta={program} />;
    case 'none':
    default:
      return <div>Unknown program: ${program.id}</div>;
  }
}
