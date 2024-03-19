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
        <div className='w-full overflow-x-auto'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableColumn className="w-[180px]">
                            Member name
                        </TableColumn>
                        <TableColumn className="w-[180px]">
                            Title
                        </TableColumn>
                        <TableColumn className="w-[180px]">
                            Project
                        </TableColumn>
                        <TableColumn className="w-[180px]">
                            Member Document
                        </TableColumn>
                        <TableColumn className='w-[180px]'>
                            Status
                        </TableColumn>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableColumn className="w-[180px]">
                            <Image src={Avatar2} alt='James Brown' className='w-8 rounded-full' />
                            <div>
                                <p className='text-gray-800 font-medium'>James Brown</p>
                                <p className='text-xs'>james@example.com</p>
                            </div>
                        </TableColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default MembersTable;
