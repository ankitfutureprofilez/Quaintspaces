import { Table, TableHeader, TableBody, TableRow, TableColumn } from "@nextui-org/react";
import Image from 'next/image';
import LoomLogo from "../assets/logos/loom.svg";
import SlackLogo from '../assets/logos/slack.svg';
import SketchLogo from '../assets/logos/sketch.svg';
import AtlassianLogo from '../assets/logos/atlassian.svg';
import PDFIcon from '../assets/icons/pdfIcon.svg';
import Avatar2 from '../assets/avatars/avatar2.png';
import Avatar5 from '../assets/avatars/avatar5.png';
import Avatar8 from '../assets/avatars/avatar8.png';
import Avatar9 from '../assets/avatars/avatar9.png';
import MoreIcon from '../assets/icons/more.svg';

function MembersTable() {
    return (
        <div className='w-full'>
       <table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
        </div>
    );
}

export default MembersTable;
