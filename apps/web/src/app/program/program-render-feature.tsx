import { ProgramCounterFeature } from './counter/program-counter-feature';
import { ProgramEpplexFeature } from './epplex/program-epplex-feature';
import { ProgramMeta } from './use-programs';

export function ProgramRenderFeature({ program }: { program: ProgramMeta }) {
  switch (program.app) {
    case 'counter':
      return <ProgramCounterFeature />;
    case 'ephemerality':
      return <ProgramEpplexFeature programMeta={program} />;
    case 'none':
    default:
      return <div>Unknown program: ${program.id}</div>;
  }
}
