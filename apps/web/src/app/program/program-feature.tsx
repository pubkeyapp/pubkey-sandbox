import { Route, Routes } from 'react-router-dom';
import { ProgramDetailFeature } from './program-detail-feature';
import { ProgramIndexFeature } from './program-index-feature';

export default function ProgramFeature() {
  return (
    <Routes>
      <Route index element={<ProgramIndexFeature />} />
      <Route path=":programId/*" element={<ProgramDetailFeature />} />
    </Routes>
  );
}
