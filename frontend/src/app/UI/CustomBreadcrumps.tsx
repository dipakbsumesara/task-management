import React, { Fragment, useCallback } from 'react';
import { Breadcrumbs, Link, Grid } from '@mui/material';
import { ICustomBreadcrump } from 'index';

type Props = {
  breadcrumps: ICustomBreadcrump[];
};

const CustomBreadcrumps = ({ breadcrumps }: Props) => {
  const getColor = useCallback(
    (breadcrump: ICustomBreadcrump) => {
      if (breadcrump.color) return breadcrump.color;
      if (breadcrump.href) return 'inherit';
      else return 'text.primary';
    },
    [breadcrumps]
  );

  return (
    <Grid sx={{ mx: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumps.map((breadcrump, index) => (
          <Fragment key={`breadcrump-item-${index}`}>
            <Link
              underline={breadcrump.href ? 'hover' : 'none'}
              color={getColor(breadcrump)}
              {...(breadcrump.href ? { href: breadcrump.href } : null)}
            >
              {breadcrump.label}
            </Link>
          </Fragment>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};

export default CustomBreadcrumps;
