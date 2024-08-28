import ReportSidebar from '../components/reports/sidebar'
import { Box, Flex, Input, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BarChart } from '../components/reports/chart'

export default function SalesReport() {
  return (
    <>
      <ReportSidebar />
      <Flex pl={[null, '15rem']} justifyContent={'center'} direction={'column'} gap={5}>
        <Stack>
          <Flex>
            <Box
              // borderRadius={"3px"}
              ml={'50px'}
              mt={'10px'}
              // align={"left"}
              // border={"1px solid black"}
              // w={"fit-content"}
              // h={'fit-content'}
            >
              <Input type="date" />
            </Box>
            <Box mt={'10px'} ml={'40px'}>
              <Menu>
                <MenuButton px={4} py={2} transition="all 0.2s" borderRadius="md" border={'1px solid black'} _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'white' }}>
                  {' '}
                  Select Time <ChevronDownIcon />{' '}
                </MenuButton>
                <MenuList>
                  <MenuItem> All Day </MenuItem>
                  <MenuItem> Custom Period</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          <Flex>
            <BarChart />
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}
