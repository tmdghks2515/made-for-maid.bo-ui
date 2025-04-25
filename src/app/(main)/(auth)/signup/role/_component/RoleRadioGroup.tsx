import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import { Role } from '@/core/type/user/user.data'
import { Dispatch, SetStateAction } from 'react'
import { ValueLabel } from '@/core/type/shared/shared.data'

type Props = {
  role: Role | undefined
  setRole: Dispatch<SetStateAction<Role | undefined>>
}

const RoleRadioOptions: ValueLabel<Role>[] = [
  {
    value: 'SHOP_OWNER',
    label: '사장님',
  },
  {
    value: 'SHOP_MANAGER',
    label: '매니저',
  },
  {
    value: 'SHOP_STAFF',
    label: '메이드/집사',
  },
]

const RoleRadioGroup = ({ role, setRole }: Props) => {
  return (
    <RadioGroup aria-label="Your role" name="role" value={role ?? ''} onChange={(e) => setRole(e.target.value as Role)}>
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {RoleRadioOptions.map((item, index) => (
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

export default RoleRadioGroup
