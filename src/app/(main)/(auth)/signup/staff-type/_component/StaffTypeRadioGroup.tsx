'use client'

import { StaffType } from '@/core/type/user/admin.command'
import useCode from '@/hook/useCode'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'

type Props = {
  staffType: StaffType | undefined
  setStaffType: (type: StaffType) => void
}

const StaffTypeRadioGroup = ({ staffType, setStaffType }: Props) => {
  const { makeOptions } = useCode()

  const options = makeOptions('STAFF_TYPE')

  return (
    <RadioGroup
      aria-label="Your staff type"
      name="staff Type"
      value={staffType ?? ''}
      onChange={(e) => setStaffType(e.target.value as StaffType)}
    >
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {options.map((item) => (
          <ListItem variant="outlined" key={item.value} sx={{ boxShadow: 'sm' }}>
            <Radio
              overlay
              value={item.value}
              label={item.label}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  )
}

export default StaffTypeRadioGroup
