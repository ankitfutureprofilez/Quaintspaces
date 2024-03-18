import { Table, TableHeader, TableBody, TableRow, TableItem } from "@nextui-org/react"; // Imported missing components
import Image from 'next/image'
import LoomLogo from "../assets/logos/loom.svg"
import SlackLogo from '../assets/logos/slack.svg'
import SketchLogo from '../assets/logos/sketch.svg'
import AtlassianLogo from '../assets/logos/atlassian.svg'
import PDFIcon from '../assets/icons/pdfIcon.svg'
import Avatar2 from '../assets/avatars/avatar2.png'
import Avatar5 from '../assets/avatars/avatar5.png'
import Avatar8 from '../assets/avatars/avatar8.png'
import Avatar9 from '../assets/avatars/avatar9.png'
import MoreIcon from '../assets/icons/more.svg'

function MembersTable() {
    return (
        <div className='w-full overflow-x-auto'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableItem  className="gv">
                            Member name
                        </TableItem>
                        <TableItem  className="gv">
                            Title
                        </TableItem>
                        <TableItem  className="gv">
                            Project
                        </TableItem>
                        <TableItem  className="gv">
                            Member Document
                        </TableItem>
                        <TableItem className='w-[180px]'>
                            Status
                        </TableItem>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableItem className="gv" >
                            <Image src={Avatar2} alt='James Brown' className='w-8 rounded-full' />
                            <div>
                                <p className='text-gray-800 font-medium'>James Brown</p>
                                <p className='text-xs'>james@example.com</p>
                            </div>
                        </TableItem>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default MembersTable;
