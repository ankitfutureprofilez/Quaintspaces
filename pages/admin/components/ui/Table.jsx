import React, { forwardRef } from "react";

function TableItem({ className, ...props }, ref) {
    return (
        <td
            ref={ref}
            className={('flex gap-2 items-center w-[220px] text-sm py-1.5 px-2', className)}
            {...props}
        />
    );
}
TableItem.displayName = 'TableItem';

function TableRow({ className, ...props }, ref) {
    return (
        <tr
            ref={ref}
            className={('hover:bg-gray-100 flex items-center justify-between duration-150 text-gray-700', className)}
            {...props}
        />
    );
}
TableRow.displayName = 'TableRow';

function TableHeader({ className, ...props }, ref) {
    return (
        <tr
            ref={ref}
            className={('bg-gray-100 rounded-lg flex items-center justify-between text-gray-500', className)}
            {...props}
        />
    );
}
TableHeader.displayName = 'TableHeader';

function TableBody({ className, ...props }, ref) {
    return (
        <tbody
            ref={ref}
            className={('space-y-2 divide-y', className)}
            {...props}
        />
    );
}
TableBody.displayName = 'TableBody';

function Table({ className, ...props }, ref) {
    return (
        <table
            ref={ref}
            className={('w-full overflow-x-auto text-sm rounded-md', className)}
            {...props}
        />
    );
}
Table.displayName = 'Table';

export { Table, TableRow, TableHeader, TableItem, TableBody };
